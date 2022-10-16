export const validateEnvVar = (envVariable: string): string => {
  const variable = process.env[envVariable];
  if (!variable) {
    throw new Error(`Could not find env variable: ${envVariable}`);
  } else {
    return variable;
  }
};
