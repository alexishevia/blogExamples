module.exports = function onFail(done, err){
  console.log(err);
  done.fail(err);
}
