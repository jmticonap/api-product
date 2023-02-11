import categoryCreateValidator from '../validators/categoryCreate.validator'
import categoryUpdateValidator from '../validators/categoryUpdate.validator'
import productCreateValidator from '../validators/productCreate.validator'
import productUpdateValidator from '../validators/productUpdate.validator'

const validatorHandlers = {
  categoryCreate: categoryCreateValidator,
  categoryUpdate: categoryUpdateValidator,
  productCreate: productCreateValidator,
  productUpdate: productUpdateValidator
}

export default validatorHandlers
