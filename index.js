/**
 * @flow
 */

'use strict';

import React from 'React';
import ReactNactive, {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import ReactElement from 'react/lib/ReactElement';

class EngsKeyboardAvoidingView extends React.Component {

  _keyBoardRef: Object;
  _scrollViewRef: ?Object;

  _contentWidth: number;
  _contentHeight: number;

  _offsetY: number;

  _pageX: ?number;
  _pageY: ?number;
  _scrollViewLayout: ?{x: number, y: number, width: number, height: number};
  _focusViewLayout: ?{x: number, y: number, width: number, height: number, pageX: number, pageY: number};


  constructor(props: Props) {
    super(props);

    this._pageX = null;
    this._pageY = null;
    
    if (Platform.OS == "ios") {
      const contentOffset = this.props.contentOffset || {};
      this._offsetY = contentOffset.x || 0;
    }
  }

  render() {
    if (Platform.OS == "android") {
      return (
        <ScrollView
          {...this.props}
          style={styles.scrollView}
          ref={this.scrollViewOnRef}
          onContentSizeChange={this.onContentSizeChange}
          scrollEventThrottle={5}
        />
      );
    } else {
      return (
        <KeyboardAvoidingView
          ref={this.keyBoardOnRef}
          behavior={"padding"}
          style={this.props.style}
        >
          <ScrollView
            {...this.props}
            style={styles.scrollView}
            onLayout={this.onLayout}
            ref={this.scrollViewOnRef}
            onContentSizeChange={this.onContentSizeChange}
            scrollEventThrottle={5}
            onScroll={this.onScroll}
          >
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
  }

  //////////

  keyBoardOnRef = (ref: Object) => {
    this._keyBoardRef = ref;
  }

  // 获取当前scrollview的node节点,用于后续相对坐标的比对
  // 页面关闭时，会主动触发此方法，并传递ref为空，告知资源被清理
  scrollViewOnRef = (ref: ?Object) => {
    this._scrollViewRef = ref;
  }

  onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    this._contentWidth = contentWidth;
    this._contentHeight = contentHeight;
  }
  
  onScroll = (e: any) => {
    this._offsetY = e.nativeEvent.contentOffset.y;
  }

  ///////

  onLayout = (e: {nativeEvent: {layout: {x: number, y: number, width: number, height: number}}}) => {
    // find scrollview pageY
    if (this._pageX === null) {
      // 获取scrollview相对屏幕的坐标
      this._scrollViewRef && this._scrollViewRef._scrollViewRef.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        this._pageX = pageX;
        this._pageY = pageY;
      });
    }

    // find scrollview layout for animate
    if (this.needScroll) {
      this._scrollViewLayout = e.nativeEvent.layout;

      this.scrollAnimated();
    }
  }

  focusViewOnFocus = (focusViewRef: Object) => {
    // have a focus
    this.needScroll = true;

    focusViewRef.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      this._focusViewLayout = {x, y, width, height, pageX, pageY};

      this.scrollAnimated();
    })
  }

  // 触发滑动动画，仅在键盘弹出后，并且focusView有layout时触发
  scrollAnimated = () => {
    // this._pageY, this._scrollViewLayout, this._focusViewLayout
    if (!this._scrollViewLayout || !this._focusViewLayout || !this.needScroll || this._pageX===null) {
      return;
    }
    
    // 计算逻辑上需要向下移动的偏移量，与offsetY坐标系相反，合并时需要乘以-1
    // 1. 焦点view超出scrollview上方，顶部对齐方式下移view
    // 2. 焦点view超出scrollview下方，并且view比较大，顶部对齐方式上移view，保证view的顶部正常显示
    // 3. 焦点view超出scrollview下方，并且view比较小，底部对齐方式上移view
    // 4. 焦点view在scrollview的范围内，不移动
    let detY = 0;
    if (this._focusViewLayout.pageY < this._pageY) {
      // 情况1
      detY = this._pageY - this._focusViewLayout.pageY;
    } else if (this._focusViewLayout.pageY+this._focusViewLayout.height > this._pageY+this._scrollViewLayout.height
      && this._focusViewLayout.height > this._scrollViewLayout.height) {
      // 情况2
      detY = this._pageY - this._focusViewLayout.pageY;
    } else if (this._focusViewLayout.pageY+this._focusViewLayout.height > this._pageY+this._scrollViewLayout.height
      && this._focusViewLayout.height < this._scrollViewLayout.height) {
      // 情况3
      detY = (this._pageY+this._scrollViewLayout.height) - (this._focusViewLayout.pageY+this._focusViewLayout.height);
    } else {
      // 情况4
      detY = 0;
    }

    // 根据偏移量和实际可以移动的范围，计算实际offset的值
    let offsetY = 0;
    if (detY < 0) {
      // 向上滚动
      offsetY = Math.max(0, this._offsetY+(-1*detY));
    } else {
      // 向下滚动
      offsetY = Math.min(this._contentHeight-this._scrollViewLayout.height, this._offsetY+(-1*detY));
    }

    this._scrollViewRef && this._scrollViewRef.scrollTo({y: offsetY});


    // 本次焦点事件已经被消费
    this._focusViewLayout = null;
    this._scrollViewLayout = null;
    this.needScroll = false;
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})

module.exports = EngsKeyboardAvoidingView;
