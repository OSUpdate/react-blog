import axios from "axios";

export const init = () => axios.get("/api/init");
export const nextBoard = () => axios.get("/api/next");
export const prevBoard = () => axios.get("/api/prev");
export const search = () => axios.get("/api/search");
export const checkLogin = () => axios.get("/api/account/getinfo");
export const logout = () => axios.get("/api/account/logout");
export const getBoards = (token) => axios.post("/api/board/get",{
    request:{
        data:{
            token
        }
    }
});
export const insertBoard = (token, title) => axios.post("/api/board/insert",{
    request:{
        data:{
            token,
            title
        }
    }
});
export const updateBoard = (token, orderNo, title) => axios.post("/api/board/update",{
    request:{
        data:{
            token,
            orderNo,
            title
        }
    }
});
export const signin = (id,password) => axios.post("/api/account/signin",{
    request:{
        data:{
            id,
            password
        }
    }
});

export const signup = (id,password,check,email) => axios.post("/api/account/signup",{
    request:{
        data:{
            id,
            password,
            check,
            email
        }
    }
});

export const developInit = (token) => axios.post("/api/develop/init",{
    request:{
        token
    }
});

export const insert = (token,title,content) => axios.post("/api/develop/insert",{
    request:{
        token,
        data:{
            title,
            content
        }
    }
});

export const update = (token,num,title,content) => axios.post("/api/develop/update",{
    request:{
        token,
        data:{
            num,
            title,
            content
        }
    }
});

export const erase = (token,num) => axios.post("/api/develop/delete",{
    request:{
        token,
        data:{
            num
        }
    }
});

export const newBoard = (token,title,parent) => axios.post("/api/develop/board/new",{
    request:{
        token,
        data:{
            title,
            parent
        }
    }
});

export const deleteBoard = (token,title,parent) => axios.post("/api/develop/board/delete",{
    request:{
        token,
        data:{
            title,
            parent
        }
    }
});