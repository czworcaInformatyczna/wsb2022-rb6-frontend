import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import CableIcon from '@mui/icons-material/Cable';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupIcon from '@mui/icons-material/Group';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';

export const menuItems = [
  {
    icon: <DashboardIcon />,
    id: 0,
    link: '/Dashboard',
    name: 'Dashboard',
    nestedList: null,
  },
  {
    icon: <AddIcon />,
    id: 1,
    link: null,
    name: 'Add',
    nestedList: [
      {
        icon: <FormatListBulletedIcon />,
        id: 0,
        link: '/AddAsset',
        name: 'Asset',
      },
      {
        icon: <CableIcon />,
        id: 1,
        link: '/AddAccessories',
        name: 'Accessories',
      },
    ],
  },
  {
    icon: <FormatListBulletedIcon />,
    id: 2,
    link: null,
    name: 'Assets',
    nestedList: [
      {
        icon: <AllInclusiveIcon />,
        id: 0,
        link: '/Assets',
        name: 'All assets',
      },
      {
        icon: <CheckIcon />,
        id: 1,
        link: '/Assets/ReadyToDeploy',
        name: 'Ready to deploy',
      },
      {
        icon: <PanoramaFishEyeIcon />,
        id: 2,
        link: '/Assets/Deployed',
        name: 'Deployed',
      },
      {
        icon: <BuildCircleOutlinedIcon />,
        id: 3,
        link: '/Assets/Maintenance',
        name: 'Maintenance',
      },
      {
        icon: <DeleteForeverOutlinedIcon />,
        id: 4,
        link: '/Assets/Archived',
        name: 'Archived',
      },
    ],
  },
  {
    icon: <CableOutlinedIcon />,
    id: 3,
    link: '/Accessories',
    name: 'Accessories',
    nestedList: null,
  },
  {
    icon: <StickyNote2OutlinedIcon />,
    id: 4,
    link: '/Licenses',
    name: 'Licenses',
    nestedList: null,
  },
  {
    icon: <LocalDrinkOutlinedIcon />,
    id: 5,
    link: '/Consumables',
    name: 'Consumables',
    nestedList: null,
  },
  {
    icon: <AccountTreeOutlinedIcon />,
    id: 6,
    link: '/Components',
    name: 'Components',
    nestedList: null,
  },
  {
    icon: <GroupIcon />,
    id: 7,
    link: '/Users',
    name: 'Users',
    nestedList: null,
  },
  {
    icon: <AdminPanelSettingsIcon />,
    id: 8,
    link: '/Roles',
    name: 'Roles',
    nestedList: null,
  },
];
