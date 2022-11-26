export default function YearMonthDay(props) {
  var flag = 0;
  if (props.index !== 0) {
    var lastDate = props.chatMessages[props.index - 1].day;
  } else if (props.index === 0) {
    var lastDate = props.day;
  }
  lastDate === props.day ? (flag = 1) : (flag = 0);
  return flag == 0 || props.index == 0 ? (
    <div>{`${props.year}-${props.month + 1}-${props.day}`}</div>
  ) : null;
}
