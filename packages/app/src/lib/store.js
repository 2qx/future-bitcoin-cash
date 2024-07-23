import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export let height = persist(writable('0'), createLocalStorage(true), 'height');
