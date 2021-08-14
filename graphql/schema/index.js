import { buildSchema} from "graphql";

const schema = buildSchema(`
    type ReturnData {
        datax: String! 
    }
    
    type Query {
        hello: String
    } 
    
    type UserLoginInfo{
        id: ID!
        avatar: String!
        email: String!
        email_verified: Boolean!
        name: String!
    }
    
    type BatchInfo{
        batchUsername: String!,
        batchName: String!,
        batchId: String!
    }
    
    type FacultyInfo{
        facultyUsername: String!,
        facultyName: String!,
        facultyId: String!
    }
    
    type trialUserReturn {
        id: String!
        username: String!
        prn: String!,
        email: String!,
        elementsAccess: String!,
        batchInfo: BatchInfo!
        facultyInfo: FacultyInfo!
    }
    
    type trialReturn {
        data:String!
    }
    
    
    type RootQuery{
        trialRun(datax: String!): ReturnData
        ip: String
        login(email: String!, prn: String!, username: String!): trialUserReturn!
        logintrial: trialReturn!
    }

    schema{
        query: RootQuery      
    }
`)
export default schema;

