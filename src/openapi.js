module.exports = {
  openapi: '3.0.0',
  info: {
    title: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version
  },
  servers: [{
    url: 'http://localhost:3000'
  }],

  // TensorFlow schema.
  components: {
    schemas: {
      DataPoints: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32'
          }
        }
      },
      TensorFace: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32'
          },
          mesh: {
            '$ref': '#/components/schemas/DataPoints'
          },
          meshRaw: {
            '$ref': '#/components/schemas/DataPoints'
          },
          box: {
            type: 'array',
            items: {
              type: 'object'
            }
          },
          boxRaw: {
            type: 'array',
            items: {
              type: 'object'
            }
          },
          score: {
            type: 'integer',
            format: 'int32'
          },
          boxScore: {
            type: 'number'
          },
          faceScore: {
            type: 'integer',
            format: 'int32'
          },
          size: {
            type: 'array',
            items: {
              type: 'object'
            }
          },
          annotations: {
            type: 'object',
            properties: {
              silhouette: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsUpperOuter: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsLowerOuter: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsUpperInner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsLowerInner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsLowerSemiOuter: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsUpperSemiOuter: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsLowerSemiInner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              lipsUpperSemiInner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeUpper0: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeLower0: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeUpper1: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeLower1: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeUpper2: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeLower2: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeLower3: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyebrowUpper: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyebrowLower: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightEyeIris: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeUpper0: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeLower0: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeUpper1: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeLower1: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeUpper2: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeLower2: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeLower3: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyebrowUpper: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyebrowLower: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftEyeIris: {
                '$ref': '#/components/schemas/DataPoints'
              },
              midwayBetweenEyes: {
                '$ref': '#/components/schemas/DataPoints'
              },
              noseTip: {
                '$ref': '#/components/schemas/DataPoints'
              },
              noseBottom: {
                '$ref': '#/components/schemas/DataPoints'
              },
              noseRightCorner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              noseLeftCorner: {
                '$ref': '#/components/schemas/DataPoints'
              },
              rightCheek: {
                '$ref': '#/components/schemas/DataPoints'
              },
              leftCheek: {
                '$ref': '#/components/schemas/DataPoints'
              }
            }
          },
          age: {
            type: 'number'
          },
          gender: {
            type: 'string'
          },
          genderScore: {
            type: 'number'
          },
          embedding: {
            type: 'array',
            items: {
              type: 'object'
            }
          },
          emotion: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                score: {
                  type: 'number'
                },
                emotion: {
                  type: 'string'
                }
              }
            }
          },
          distance: {
            type: 'number'
          },
          rotation: {
            type: 'object',
            properties: {
              angle: {
                type: 'object',
                properties: {
                  pitch: {
                    type: 'number'
                  },
                  yaw: {
                    type: 'number'
                  },
                  roll: {
                    type: 'number'
                  }
                }
              },
              matrix: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              gaze: {
                type: 'object',
                properties: {
                  bearing: {
                    type: 'number'
                  },
                  strength: {
                    type: 'number'
                  }
                }
              }
            }
          }
        }
      }
    },
    body: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    hand: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    gesture: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          face: {
            type: 'integer',
            format: 'int32'
          },
          gesture: {
            type: 'string'
          },
          iris: {
            type: 'integer',
            format: 'int32'
          }
        }
      }
    },
    object: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    performance: {
      type: 'object',
      properties: {
        initBackend: {
          type: 'integer',
          format: 'int32'
        },
        loadModels: {
          type: 'integer',
          format: 'int32'
        },
        inputProcess: {
          type: 'integer',
          format: 'int32'
        },
        totalFrames: {
          type: 'integer',
          format: 'int32'
        },
        cachedFrames: {
          type: 'integer',
          format: 'int32'
        },
        cacheCheck: {
          type: 'integer',
          format: 'int32'
        },
        total: {
          type: 'integer',
          format: 'int32'
        }
      }
    },
    canvas: {
      type: 'string',
      format: 'nullable'
    },
    timestamp: {
      type: 'integer',
      format: 'int64'
    },
    error: {
      type: 'string',
      format: 'nullable'
    },
    width: {
      type: 'integer',
      format: 'int32'
    },
    height: {
      type: 'integer',
      format: 'int32'
    },
    persons: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32'
          },
          face: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int32'
              },
              mesh: {
                '$ref': '#/components/schemas/DataPoints'
              },
              meshRaw: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: {
                    type: 'number'
                  }
                }
              },
              box: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              boxRaw: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              score: {
                type: 'integer',
                format: 'int32'
              },
              boxScore: {
                type: 'number'
              },
              faceScore: {
                type: 'integer',
                format: 'int32'
              },
              size: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              annotations: {
                type: 'object',
                properties: {
                  silhouette: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsUpperOuter: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsLowerOuter: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsUpperInner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsLowerInner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsLowerSemiOuter: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsUpperSemiOuter: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsLowerSemiInner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  lipsUpperSemiInner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeUpper0: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeLower0: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeUpper1: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeLower1: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeUpper2: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeLower2: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeLower3: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyebrowUpper: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyebrowLower: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightEyeIris: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeUpper0: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeLower0: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeUpper1: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeLower1: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeUpper2: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeLower2: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeLower3: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyebrowUpper: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyebrowLower: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftEyeIris: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  midwayBetweenEyes: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  noseTip: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  noseBottom: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  noseRightCorner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  noseLeftCorner: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  rightCheek: {
                    '$ref': '#/components/schemas/DataPoints'
                  },
                  leftCheek: {
                    '$ref': '#/components/schemas/DataPoints'
                  }
                }
              },
              age: {
                type: 'number'
              },
              gender: {
                type: 'string'
              },
              genderScore: {
                type: 'number'
              },
              embedding: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              emotion: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    score: {
                      type: 'number'
                    },
                    emotion: {
                      type: 'string'
                    }
                  }
                }
              },
              distance: {
                type: 'number'
              },
              rotation: {
                type: 'object',
                properties: {
                  angle: {
                    type: 'object',
                    properties: {
                      pitch: {
                        type: 'number'
                      },
                      yaw: {
                        type: 'number'
                      },
                      roll: {
                        type: 'number'
                      }
                    }
                  },
                  matrix: {
                    type: 'array',
                    items: {
                      type: 'object'
                    }
                  },
                  gaze: {
                    type: 'object',
                    properties: {
                      bearing: {
                        type: 'number'
                      },
                      strength: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          body: {
            type: 'string',
            format: 'nullable'
          },
          hands: {
            type: 'object',
            properties: {
              left: {
                type: 'string',
                format: 'nullable'
              },
              right: {
                type: 'string',
                format: 'nullable'
              }
            }
          },
          gestures: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                face: {
                  type: 'integer',
                  format: 'int32'
                },
                gesture: {
                  type: 'string'
                },
                iris: {
                  type: 'integer',
                  format: 'int32'
                }
              }
            }
          },
          box: {
            type: 'array',
            items: {
              type: 'object'
            }
          },
          boxRaw: {
            type: 'array',
            items: {
              type: 'object'
            }
          }
        }
      }
    }
  }
};
