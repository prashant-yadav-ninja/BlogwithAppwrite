import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
     client = new Client()
    // .setEndpoint(conf.appwriteURL)
    // .setProject(conf.projectId)

    // :: i can create account and client but approach is this when object form then client and account form and this can achieve with the help of constructor 
    account ;

    constructor(){
        // this.client.setEndpoint(conf.appwriteURL)   ** not this way 
        // this.client.setProject(conf.projectId)

        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectId)

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if ( userAccount )
            {
                // instead of returning user why not login if userAccount created succesfully 
                return this.login({email,password})
            }
            else{
                return userAccount ;
            }
        } catch (error) {
            console.log('Appwrite create account error :: ', error)
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log('Appwrite login error :: ',error)
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions() ;
        } catch (error) {
            console.log('Appwrite logout error :: ',error)
        }
    }

    async getCurrentUser(){
        try {
            // const user = this.account.get() ;
            return this.account.get() ;
        } catch (error) {
            console.log('Appwrite currentUser error :: ',error)
        }
    }

    
}


// export default AuthService   :: instead of sending exporting class more convinent making object export it by user can directly use it methods and properties

const authService = new AuthService() ;

export default authService ;