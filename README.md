# react-native-keyboard-avoiding-view

(中文版本请参看[这里](#chinese))

iOS Keyboard Avoiding View. Focus view will slide on the window, to prevent rolling to the outside of the screen 

![](https://github.com/EngsShi/react-native-keyboard-avoiding-view/gif/top.png)

![](https://github.com/EngsShi/react-native-keyboard-avoiding-view/gif/bottom.png)



## Usage

`react-native-keyboard-avoiding-view` use like `ScrollView`.

```
<KeyboardAvoidingView 
	ref={'keyboardView'}
	style={styles.container} 
	contentContainerStyle={styles.content}
>
</KeyboardAvoidingView>
```



1. Bind onFocus for TextInput

   ```
   <TextInput
   	ref={'secondView'}
   	onFocus={() => this.onFocus(this.refs.secondView)}
   />
   ```

2. send scroll event

   ```
   onFocus = (focusView) => {
   	const keyboardView = this.refs.keyboardView;
   	keyboardView.focusViewOnFocus(focusView);
   }
   ```



### extension

`focusView` can be use any view. If use super view, animate will scroll with super view.

```
<KeyboardAvoidingView 
	ref={'keyboardView'}
	style={styles.container} 
	contentContainerStyle={styles.content}
>
	<View 
		style={styles.bigView}
		ref={'firstView'}
	>
		<TextInput
			style={styles.textInput}
			onFocus={() => this.onFocus(this.refs.firstView)}
		/>
	</View>
</KeyboardAvoidingView>
```

------

## <span id="chinese">react-native-keyboard-avoiding-view</span>

作为系统 KeyboardAvoidingView 的扩展类，实现键盘弹起后自动滚动到TextInput位置，解决ios键盘弹起后输入框被遮盖问题。



## Usage

`react-native-keyboard-avoiding-view` 使用方式与 `ScrollView` 相同.

```
<KeyboardAvoidingView 
	ref={'keyboardView'}
	style={styles.container} 
	contentContainerStyle={styles.content}
>
</KeyboardAvoidingView>
```



1. TextInput 绑定 onFocus 事件 

   ```
   <TextInput
   	ref={'secondView'}
   	onFocus={() => this.onFocus(this.refs.secondView)}
   />
   ```

2. 发送滚动事件

   ```
   onFocus = (focusView) => {
   	const keyboardView = this.refs.keyboardView;
   	keyboardView.focusViewOnFocus(focusView);
   }
   ```

### 扩展

发送滚动事件时，`focusView` 能够传递任何view。如果传入的是TextInput的包裹view，滚动时将会按照传入的view的大小和坐标滚动。

```
<KeyboardAvoidingView 
	ref={'keyboardView'}
	style={styles.container} 
	contentContainerStyle={styles.content}
>
	<View 
		style={styles.bigView}
		ref={'firstView'}
	>
		<TextInput
			style={styles.textInput}
			onFocus={() => this.onFocus(this.refs.firstView)}
		/>
	</View>
</KeyboardAvoidingView>
```

------

