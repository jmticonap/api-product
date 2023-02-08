// TODO: make service for external API data
// const productService = {
//   create: async (product: ProductEntity): Promise<ProductEntity> => {
//     try {
//       return await PostgresDataSource.getRepository(ProductEntity).save(product)
//     } catch (error) {
//       throw new Error(String(error))
//     }
//   },
//   findAll: async (): Promise<ProductEntity[]> => {
//     try {
//       return await PostgresDataSource.getRepository(ProductEntity).find()
//     } catch (error) {
//       throw new Error(String(error))
//     }
//   },
//   findById: async (id: number): Promise<ProductEntity> => {
//     try {
//       const product: ProductEntity | null = await PostgresDataSource
//         .getRepository(ProductEntity)
//         .findOneBy({ id })
//       if (product != null) {
//         return product
//       } else {
//         throw new Error('Product not found')
//       }
//     } catch (error) {
//       throw new Error(String(error))
//     }
//   }
// }

// export default productService
