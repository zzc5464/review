import './index';
import '@/utils/index';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import md from './md/01.md';
console.log(moment);
console.log(axios);
console.log($);
console.log('md',md);
document.getElementById('box').innerHTML = md;