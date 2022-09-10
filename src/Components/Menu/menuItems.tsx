import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CableIcon from '@mui/icons-material/Cable';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CheckIcon from '@mui/icons-material/Check';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const menuItems = [
  {
    id: 0,
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/Dashboard',
    nestedList: null
  },
  {
    id: 1,
    name: 'Add',
    icon: <AddIcon />,
    link: null,
    nestedList: [
      {
        id: 0,
        name: 'Asset',
        icon: <FormatListBulletedIcon />,
        link: '/AddAsset'
      },
      {
        id: 1,
        name: 'Accessories',
        icon: <CableIcon />,
        link: '/AddAccessories'
      }
    ]
  },
  {
    id: 2,
    name: 'Assets',
    icon: <FormatListBulletedIcon />,
    link: null,
    nestedList: [
      {
        id: 0,
        name: 'All assets',
        icon: <AllInclusiveIcon />,
        link: '/Assets/All'
      },
      {
        id: 1,
        name: 'Ready to deploy',
        icon: <CheckIcon />,
        link: '/Assets/ReadyToDeploy'
      },
      {
        id: 2,
        name: 'Deployed',
        icon: <PanoramaFishEyeIcon />,
        link: '/Assets/Deployed'
      },
      {
        id: 3,
        name: 'Maintenance',
        icon: <BuildCircleOutlinedIcon />,
        link: '/Assets/Maintenance'
      },
      {
        id: 4,
        name: 'Archived',
        icon: <DeleteForeverOutlinedIcon />,
        link: '/Assets/Archived'
      }
    ]
  },
  {
    id: 3,
    name: 'Accessories',
    icon: <CableOutlinedIcon />,
    link: '/Accessories',
    nestedList: null
  },
  {
    id: 4,
    name: 'Licenses',
    icon: <StickyNote2OutlinedIcon />,
    link: '/Licenses',
    nestedList: null
  },
  {
    id: 5,
    name: 'Consumables',
    icon: <LocalDrinkOutlinedIcon />,
    link: '/Consumables',
    nestedList: null
  },
  {
    id: 6,
    name: 'Components',
    icon: <AccountTreeOutlinedIcon />,
    link: '/Components',
    nestedList: null
  },
  {
    id: 7,
    name: 'Users',
    icon: <GroupIcon />,
    link: '/Users',
    nestedList: null
  },
  {
    id: 8,
    name: 'Roles',
    icon: <AdminPanelSettingsIcon />,
    link: '/Roles',
    nestedList: null
  }
];
