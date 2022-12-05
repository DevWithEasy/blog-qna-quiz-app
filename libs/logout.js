export default async function logout(router,dispatch,action){
    dispatch(action())
    router.push('/')
}