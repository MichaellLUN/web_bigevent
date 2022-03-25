function template(id, data) {
    document.getElementById(id).innerHTML
    let pattern = /{{\s*([a-zA-Z]+)\s*}}/

    let pattResult = null
    while (pattResult = pattern.exec(str)) {
        str = str.replace(pattResult[0], data[pattResult[1]])
    }
    return str
}