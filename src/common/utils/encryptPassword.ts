import * as bcrypt from 'bcrypt'

type Reference = {
  password: string
}

export const encryptPassword = async (
  reference: Reference
): Promise<void> => {
  const hashPassword = await bcrypt.hash(reference.password, 10)
  reference.password = hashPassword
}

export const isPasswordEqual = async (
  password: string,
  reference: Reference
  ): Promise<boolean> => {

  return bcrypt.compare(password, reference.password)
}
