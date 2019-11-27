export const test = () => {
  return 'test'
}

 const a  = async () => {
  return "----"
}

export const b = async () => {
  return await a()
}