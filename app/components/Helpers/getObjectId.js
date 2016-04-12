export default (table, key) => {
    return table.filter(obj => obj.name == key).map(obj => {
        return obj.objectId
    }).toString()
}
