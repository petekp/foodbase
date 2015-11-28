export function sortByKey(array, key) {
    return array.sort((a, b) => {
        let x = a[key],
            y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
}
