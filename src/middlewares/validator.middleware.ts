import categoryCreateValidator from '../validators/categoryCreate.validator'
import categoryUpdateValidator from '../validators/categoryUpdate.validator'
import featureCreateValidator from '../validators/featureCreate.validator'
import featureUpdateValidator from '../validators/featureUpdate.validator'
import productCreateValidator from '../validators/productCreate.validator'
import productUpdateValidator from '../validators/productUpdate.validator'

const validatorHandlers = {
  categoryCreate: categoryCreateValidator,
  categoryUpdate: categoryUpdateValidator,
  productCreate: productCreateValidator,
  productUpdate: productUpdateValidator,
  featureCreate: featureCreateValidator,
  featureUpdate: featureUpdateValidator
}

export default validatorHandlers
