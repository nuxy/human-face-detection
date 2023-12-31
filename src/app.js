'use strict';

const tf    = require('@tensorflow/tfjs-node');
const Human = require('@vladmandic/human').default;

const debug = (process.env.HUMAN_DEBUG === 'true');

const config = {
  modelBasePath: `file://${process.env.HUMAN_MODELS_DIR}`,
  body:    {enabled: false},
  gesture: {enabled: false},
  hand:    {enabled: false},
  debug
};

/**
 * @openapi
 *
 * /:
 *   post:
 *     description: Check image for human faces.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JSON response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 faces:
 *                   type: array
 *                   items:
 *                     "$ref": "#/components/schemas/TensorFace"
 *       500:
 *         description: Internal Server Error
 *         headers:
 *           Cache-Control:
 *             schema:
 *               type: string
 *               example: max-age=0
 */
exports.handler = async (event) => {
  try {
    const params    = event.body && JSON.parse(event.body);
    const base64Img = params?.file;

    const data = {faces: null};

    if (base64Img) {
      const human = new Human(config);
      await human.load();

      const buffer = Buffer.from(base64Img, 'base64');

      if (buffer) {
        const tensor = human.tf.node.decodeImage(buffer);

        data.faces = (await human.detect(tensor))?.face;
      }
    }

    // Return success response.
    return {
      headers: {
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {

    debug && console.warn(err.message);

    // Return error response.
    return {
      headers: {'Cache-Control': 'max-age=0'},
      statusCode: 500
    };
  }
};
