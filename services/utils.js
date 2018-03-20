const utilsService = {}

utilsService.compareAddress = function (address1, address2) {
  if (!address1 || !address2) { return false }

  address1 = address1.toLowerCase()
  address2 = address2.toLowerCase()

  return address1 === address2
}

export default utilsService
