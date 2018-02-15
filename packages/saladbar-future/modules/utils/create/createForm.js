import { JSDOM } from 'jsdom';

const createForm = classname =>
  JSDOM.fragment(
    `<form name="test-form" class="${classname}">
      <input type="text" name="input" value="input" />
    	<input type="checkbox" value="yes" name="yes"/>
    	<select name="one">
    		<option value="one" selected="selected">Option One</option>
    	</select>
    	<textarea name="message">message</textarea>
      <input type="submit" value="Send" class="btn btn-primary btn-block" />
    </form>`
  );

export default createForm;
