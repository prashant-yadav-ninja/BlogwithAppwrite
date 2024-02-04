import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service

























// import conf from "../conf/conf";
// import { Client, Databases, ID, Query, Storage } from "appwrite";

// export class Service {
//   client = new Client();
//   database;
//   storage;

//   constructor() {
//     this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectId);

//     this.database = new Databases(this.client);
//     this.storage = new Storage(this.client);
//   }

//   async createPost({ title, slug, content, featuredImage, status, userId }) {
//     try {
//       return await this.database.createDocument(
//         conf.databaseId,
//         conf.collectionId,
//         slug,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//           userId,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite createPost error :: ", error);
//     }
//   }

//   async updatePost(slug, { title, content, featuredImage, status }) {
//     try {
//       return await this.database.updateDocument(
//         conf.databaseId,
//         conf.collectionId,
//         slug,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite updatePost error :: ", error);
//     }
//   }

//   async deletePost(slug) {
//     try {
//       await this.database.deleteDocument(
//         conf.databaseId,
//         conf.collectionId,
//         slug
//       );
//     } catch (error) {
//       console.log("Appwrite deletepost error :: ", error);
//     }
//   }

//   async getPost(slug) {
//     try {
//       return await this.database.getDocument(
//         conf.databaseId,
//         conf.collectionId,
//         slug
//       );
//     } catch (error) {
//       console.log("Appwrite getPost error :: ", error);
//     }
//   }

//   async getPosts(queries = [Query.equal("status", "active")]) {
//     try {
//       return await this.database.listDocuments(
//         conf.databaseId,
//         conf.collectionId,
//         queries
//       );
//     } catch (error) {
//       console.log("Appwrite getPosts error :: ", error);
//     }
//   }

//   // file upload service

//   async uploadFile(file) {
//     try {
//       return await this.storage.createFile(conf.bucketId, ID.unique(), file);
//     } catch (error) {
//       console.log("Appwrite uploadfile error :: ", error);
//     }
//   }

//   async deleteFile(fileId){
//     try {
//         await this.storage.deleteFile(conf.bucketId,fileId)
//         return true ;
//     } catch (error) {
//         console.log('Appwrite deleteFile error :: ',error)
//         return false ;
//     }
//   }

//   getfilePreview(fileId){
//     return this.storage.getFilePreview(conf.bucketId,fileId) ;
//   }
// }

// const service = new Service();
// export default service;


