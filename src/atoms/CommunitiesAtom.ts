
import {atom } from 'recoil'
import {Timestamp} from 'firebase/firestore'

 export interface Community {
    id:string,
    creatorId:string,
    numberOfMembers:number,
    privacyType: 'public' | 'restricted' | 'private',
    createdAt?:Timestamp
    imageURL?: string
}

export interface CommunitySnippet{
    id:string,
    isModerator?:boolean,
    imageURL?:string,

}
export interface ComunnityState{
    mySnippets:Community[],
}

const defaultCommunityState:ComunnityState = {
    mySnippets:[]

}

export const communityState = atom<ComunnityState>({
    key:'communityState',
    default:defaultCommunityState
})
