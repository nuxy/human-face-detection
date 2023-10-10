FROM public.ecr.aws/lambda/nodejs:16

COPY src/app.js   ${LAMBDA_TASK_ROOT}
COPY package.json ${LAMBDA_TASK_ROOT}

RUN npm install --prefix ${LAMBDA_TASK_ROOT} --omit=dev

CMD ["app.handler"]
