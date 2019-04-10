import './index';
import '@/utils/index';
import axios from 'axios';
import moment from 'moment';
console.log('success');
console.log('moment', moment);
axios.get('/user').then(res => {
  console.log('mock',res);
})