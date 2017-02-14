# react-native-keyboard-avoiding-view
iOS Keyboard Avoiding View. Focus view will slide on the window, to prevent rolling to the outside of the screen 



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

