import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export let height = persist(writable(''), createLocalStorage(true), 'height');
export let receiptAddress = persist(writable(''), createLocalStorage(true), 'receiptAddress');
export let walletDbString = persist(writable(''), createLocalStorage(true), 'walletDbString');
