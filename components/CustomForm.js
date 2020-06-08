
import { Platform } from 'react-native';
import t from 'tcomb-form-native';
import { Colors } from '../styling';

const fontFamily = Platform.OS === 'android' ? 'CircularStdBook' : 'CircularStd-Book';
const Form = t.form.Form;

// clone the default stylesheet
t.form.Form.stylesheet.textbox.normal.height = 44;
t.form.Form.stylesheet.textbox.normal.borderRadius = 12;
t.form.Form.stylesheet.textbox.normal.backgroundColor = Colors.white;
t.form.Form.stylesheet.textbox.normal.borderColor = Colors.white;
t.form.Form.stylesheet.textbox.normal.fontSize= 14;
t.form.Form.stylesheet.textbox.normal.fontFamily= fontFamily;

t.form.Form.stylesheet.textbox.error.height = t.form.Form.stylesheet.textbox.normal.height;
t.form.Form.stylesheet.textbox.error.borderRadius = t.form.Form.stylesheet.textbox.normal.borderRadius;
t.form.Form.stylesheet.textbox.error.backgroundColor = Colors.white;
t.form.Form.stylesheet.textbox.error.borderColor = Colors.white;
t.form.Form.stylesheet.textbox.error.fontSize= t.form.Form.stylesheet.textbox.normal.fontSize;
t.form.Form.stylesheet.textbox.error.fontFamily =t.form.Form.stylesheet.textbox.normal.fontFamily;

t.form.Form.stylesheet.select.normal.height = 44;
t.form.Form.stylesheet.select.normal.borderRadius = 12;
t.form.Form.stylesheet.select.error.borderRadius = 12;
t.form.Form.stylesheet.select.normal.backgroundColor = Colors.white;
t.form.Form.stylesheet.select.normal.borderColor = Colors.turquoise;
t.form.Form.stylesheet.select.normal.fontSize= 14;
t.form.Form.stylesheet.select.normal.fontFamily= fontFamily;
t.form.Form.stylesheet.select.normal.color = Colors.lightgrayPlus1;

class CustomForm extends Form {

  constructor(props) {
    super(props);
  }

}

export default CustomForm;