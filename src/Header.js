import { config } from "./config";
export default function Header(props) {
  const { openApplication } = props;
  const appClicked = (event) => {
    openApplication(config.apps[event.target.getAttribute("value")]);
  };
  const appList = config.apps.map((val, index) => {
    return (
      <span key={`${val.name}_key`}>
        <a href={`#${val.name}`} value={index} onClick={appClicked}>
          {val.name}
        </a>
        &nbsp;
      </span>
    );
  });
  return <div>Click to load : {appList}</div>;
}
