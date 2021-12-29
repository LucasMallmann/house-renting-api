type Address = {
  street: string
  houseNumber: number
  zipCode: string
}

export type HouseModel = {
  id: string
  city: string
  state: string
  name: string
  location: {
    type: string,
    coordinates: number[]
  }
  address: Address
}
