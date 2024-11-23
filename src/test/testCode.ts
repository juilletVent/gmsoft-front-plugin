export const testCode = `import { Skeleton } from 'antd';
import React, { useCallback, useState, useMemo } from 'react';
import {
  useAnimOpen,
  useCounter,
  useOnlineInfo,
  useRoomLogin,
  useSearchParams,
  useToggle,
} from 'common/src/hooks';
import { useSelector } from 'react-redux';
import { useActions } from 'gm-react-hanger';
import {
  getOpenRoomState,
  getOpenRoomInfo,
  ModelState,
  getProviderCertSerial,
} from 'online-assessment-app/src/model/RoomModel/actions';
import { TokenCxt } from 'common/src/hooks/useRoomLogin.hooks';
import { OpenStage } from 'common/src/enum/OpenBidStage.enum';
import getValue from '@gmsoft/tools/lib/getValue';
import GmsoftComponent from 'common/src/components/CloudComponent/GmsoftComponent';
import { debounce, isEmpty } from 'lodash';
import TransitionGroup from '@/components/TransitionGroup';
import { useConcentrated } from '@/components/Business/TopBar/useConcentrated.hooks';
import PackageExecInfo from '@/components/Business/PackageExecInfo/PackageExecInfo';
import RoomFile from '@/components/Business/RoomFile/RoomFile';
import { WebSocketEventType } from '@/components/Business/InfoChannelSocket/InfoChannelSocket';
import ExceptionNotification from '@/components/Business/ExceptionNotification/ExceptionNotification';
import Decryption from './Decryption/Decryption';
import Standby from './Standby/Standby';
import RemovedModal from '../common/components/RemovedModal';
import FinishedModal from '../common/components/FinishedModal';
import RoomChat from '../common/components/IM/RoomChat';
import RoomMember from '../common/components/IM/RoomMember';
import {
  BodyLayout,
  BodyWrapper,
  ContentLayout,
  FlowLayout,
  HallLayout,
  IMLayout,
  OpenRoomCssLayout,
} from '../common/style/OpenHallStyle';
import { useMemoVal } from './useMemoVal';
import '@gmsoft/im-sdk/dist/style.css';
import './style.css';
import { useCenterEffect } from './useCenterEffect';
import CancelModal from './common/CancelModal';
import {
  CounterScene,
  useValidProviderCount,
} from '../ReviewRoom/common/hooks/useValidProviderCount.hooks';
import { renderSign } from './SignIn/renderSign';
import { renderResultConfirm } from './ResultConfirm/renderResultConfirm';
import OpenRoomPageHeader from '../common/components/OpenRoomPageHeader';
import Evaluating from './Evaluating/Evaluating';
import DrawNumLayer from './common/DrawNumLayer';
import { OpenRoomTableStyle } from './common/list.style';
import EvaluateUnPass from './EvaluateUnPass/EvaluateUnPass';


dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("zh-cn");

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <BrowserRouter basename="/front">
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;
