export default ()=> {
  return {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("userToken")
    }
  }
}