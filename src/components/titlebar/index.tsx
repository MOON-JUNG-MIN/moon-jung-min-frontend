import styled from 'styled-components';
import Icons from '../../../assets/headicons.png';

export default function TitleBar() {
  return (
    <Wrapper>
      <CloseIcon
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('closeApp', []);
        }}
      />
      <SmallIcon
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('minimizeApp', []);
        }}
      />
      <ZoomIcon
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('maximizeApp', []);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 30px;
  -webkit-app-region: drag;
  border-radius: 10px 10px 0 0;
  background-color: gray;
  > div {
    -webkit-app-region: no-drag;
    zoom: 70%;
    position: absolute;
    top: 10px;
  }
`;

const CloseIcon = styled.div`
  width: 22px;
  height: 22px;
  background-image: url(${Icons});
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: -15px -16px;
  left: 10px;
  :hover {
    background-position: -15px -38px;
  }
`;

const SmallIcon = styled.div`
  width: 22px;
  height: 22px;
  background-image: url(${Icons});
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: -38px -16px;
  left: 40px;
  :hover {
    background-position: -38px -38px;
  }
`;

const ZoomIcon = styled.div`
  width: 22px;
  height: 22px;
  left: 70px;
  background-image: url(${Icons});
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: -62px -16px;
  :hover {
    background-position: -62px -38px;
  }
`;
