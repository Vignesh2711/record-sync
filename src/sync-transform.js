function transformAToB(recordA) {
  return {
    externalId: recordA.id,
    fullName: recordA.name,
    contact: recordA.email,
    isActive: recordA.status === "active"
  };
}

function transformBToA(recordB) {
  return {
    id: recordB.externalId,
    name: recordB.fullName,
    email: recordB.contact,
    status: recordB.isActive ? "active" : "inactive"
  };
}

module.exports = { transformAToB, transformBToA };