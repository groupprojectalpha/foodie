module.exports = function (insert){
  if(typeof insert !== 'string'){return null}
  let parsed = insert.replace(/'/ , "`")
  return parsed
}