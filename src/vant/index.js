import Vue from 'vue'
import {
  Toast,
  Tag as VanTag,
  Skeleton as VanSkeleton,
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  Collapse as VanCollapse,
  CollapseItem as VanCollapseItem,
  Popup as VanPopup,
  Field as VanField,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Image as VanImage,
  Picker as VanPicker,
  Search as VanSearch,
  Sticky as VanSticky,
  List as VanList,
  ActionSheet as VanActionSheet,
  Dialog as VanDialog,
  Tab as VanTab,
  Tabs as VanTabs,
  DatetimePicker as VanDatetimePicker,
  CountDown as VanCountDown,
  Grid as VanGrid,
  GridItem as VanGridItem,
  RadioGroup as VanRadioGroup,
  Radio as VanRadio,
  Overlay as VanOverlay,
  Checkbox as VanCheckbox,
  Stepper as VanStepper,
  GoodsAction as VanGoodsAction,
  GoodsActionIcon as VanGoodsActionIcon,
  GoodsActionButton as VanGoodsActionButton,
  CheckboxGroup as VanCheckboxGroup,
  Area as VanArea,
  Step as VanStep,
  Steps as VanSteps,
  Rate as VanRate,
  Uploader as VanUploader,
  SubmitBar as VanSubmitBar,
  AddressEdit as VanAddressEdit,
  Button as VanButton,
  PullRefresh as VanPullRefresh,
  Lazyload  as VanLazyload ,
  Icon as VanIcon

} from 'vant'

Toast.setDefaultOptions('loading', {forbidClick: true, loadingType: 'spinner', duration: 0});
Vue.use(Toast)
Vue.use(VanLazyload)
Vue.use(VanIcon)
Vue.use(VanPullRefresh)
Vue.use(VanSkeleton)
Vue.use(VanButton);
Vue.use(VanRate)
Vue.use(VanUploader)
Vue.use(VanSubmitBar)
Vue.use(VanStep)
Vue.use(VanSteps)
Vue.use(VanSwipe)
Vue.use(VanSwipeItem)
Vue.use(VanCollapse)
Vue.use(VanCollapseItem)
Vue.use(VanPopup)
Vue.use(VanField)
Vue.use(VanCell)
Vue.use(VanCellGroup)
Vue.use(VanImage)
Vue.use(VanPicker)
Vue.use(VanSearch)
Vue.use(VanSticky)
Vue.use(VanList)
Vue.use(VanActionSheet)
Vue.use(VanDialog)
Vue.use(VanTab)
Vue.use(VanTabs)
Vue.use(VanDatetimePicker)
Vue.use(VanCountDown)
Vue.use(VanGrid)
Vue.use(VanGridItem)
Vue.use(VanRadioGroup)
Vue.use(VanRadio)
Vue.use(VanOverlay)
Vue.use(VanTag)
Vue.use(VanCheckbox)
Vue.use(VanCheckboxGroup)
Vue.use(VanGoodsAction)
Vue.use(VanGoodsActionIcon)
Vue.use(VanGoodsActionButton)
Vue.use(VanStepper)
Vue.use(VanAddressEdit)
Vue.use(VanArea)
