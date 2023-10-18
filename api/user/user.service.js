const db = require("../../config/connection")

module.exports = {
    //Register
    serviceAdd: (data)=>{
      db.query(
        `insert into tb_user set ?`,
        [data]
      )  
    },
    serviceUpdate:(data)=>{
        db.query(
            `update tb_user set status=? where email_user=?`
            ,[
                data.status,
                data.email_user
            ]);
    },
    serviceCheck:(data,callBack)=>{
        db.query(
            `select status from tb_user where email_user=?`,
            [data.email_user],
            (err,results)=>{
                if(err){
                    return callBack(err);
                }else if(results == 0){
                    return callBack("kosong")
                }else if(results[0].status == 0){
                    return callBack("verifyet")
                }else if(results[0].status == 1){
                    return callBack("verify")
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    },

    //Login
    serviceLogin: (data,callBack)=>{ 
        // console.log(data);
        db.query(
            `select email_user,password,status from tb_user where email_user=? `,
            [data.email_user],(err,results)=>{
                // console.log(results[0] == null);
                if(err){
                    return callBack(err)
                }if(results[0] == null){
                    return callBack("tidak ada")
                }if(results[0].status == 0){
                    return callBack("verifydulu")
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    },
}