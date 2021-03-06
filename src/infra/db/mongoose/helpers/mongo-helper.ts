import mongoose from 'mongoose'

export const MongoHelper = {
  uri: null as unknown as string,
  connection: typeof mongoose,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.connection = await mongoose.connect(uri, { connectTimeoutMS: 3000 })
  },

  async disconnect (): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect()
    }
  },

  withId (collection: any): any {
    const { _id, __v, ...collectionWithouId } = collection
    return { id: _id, ...collectionWithouId }
  }
}
