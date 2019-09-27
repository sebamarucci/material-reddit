import moment from 'moment'

export default function fromNow(date) {
  return moment.utc(moment.unix(date)).local().fromNow();
};