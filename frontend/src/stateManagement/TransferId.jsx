import { atom } from 'recoil';

export const idTranfer = atom({
    key: 'idTransfer',
    default: 0 
})

export const sendToName = atom({
    key: 'sendToName',
    default: ''
});

export const sendToLstNm = atom({
    key: 'sendToLstNm',
    default: ''
});