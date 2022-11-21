const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WWW API",
      version: "1.0.0",
      description: "Swagger for API"
    },
    servers: [
      {
        url: "https://localhost:3000/"
      }
    ],
    components: {
      schemas: {
        Role: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'string',
              description: 'Role user',
              enum: ['BASIC', 'INVESTOR', 'ADMIN'],
              default: 'BASIC'
            },
          },
        },
        Investment: {
          type: 'object',
          required: ['amount', 'userId'],
          properties: {
            amount: {
              type: 'number',
              description: 'Amount of investment'
            },
            userId: {
              type: 'string',
              description: 'Id creator investment'
            },

          },
        },
        User: {
          type: 'object',
          required: ['email', 'password', 'role', 'capital'],
          properties: {
            email: {
              type: 'string',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'User password'
            },
            role: {
              type: 'string',
              description: 'User role'
            },
            capital: {
              type: 'object',
              description: 'All user investments',
              properties: {
                investment: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      investmentId: {
                        type: 'string'
                      },
                      amount: {
                        type: 'number',
                        default: 0
                      }
                    }
                  }
                },
                totalAmountInvestment: {
                  type: 'number',
                  default: 0
                }
              }
            }
          },
        }
      },
    },
  },
  apis: ["../routes/auth.js"]
};

module.exports = options;