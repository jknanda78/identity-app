import React from "react";
import Layout from "@components/layout";
import InputField from "@components/containers/input-field.container";
import { GlobalNotificationModel } from "@models/global-notification.model";
import Link from "@components/containers/link.container";
import PrimaryButton from "@components/containers/primary-button.container";
import Form from "@components/containers/form.container";
import { FormFields } from "@models/form.model";
import { SET_USER_PROFILE } from "@store/types";

type CreateAccountProps = {
  actions: any;
  history: any;
  notification: GlobalNotificationModel;
};

const CreateAccount: React.FunctionComponent<CreateAccountProps> = (props) => {
  const { push } = props.history;
  const formId = "CREATE_ACCOUNT";

  // Form submit handler
  const handleOnSubmit = (e: React.SyntheticEvent, fields: FormFields, isFormValid: boolean) => {
    const { actions } = props;
    const { first_name, last_name, email_address, pwd } = fields;

    if (isFormValid) {
      actions.httpRequest({
        data: {
          firstname: first_name,
          lastname: last_name,
          username: email_address,
          password: pwd
        },
        method: "post",
        url: "/account/createAccount",
        success: SET_USER_PROFILE
      }).then(() => {
        actions.storePwdCredential({
          credentials: {
            id: email_address,
            name: email_address,
            password: pwd
          }
        });
      });
    }
  };

  const { notify, notifyMessage, notifyType } = props.notification;

  return (
    <Layout
      notify={notify}
      notifyMessage={notifyMessage}
      notifyType={notifyType}
      title="Create account"
    >
      <div>
        <Form id={formId} onSubmit={handleOnSubmit}>
          <InputField
            formId={formId}
            id="first_name"
            label="First name (required)"
            type="text"
            validator="default"
          />
          <InputField
            formId={formId}
            id="last_name"
            label="Last name (required)"
            type="text"
            validator="default"
          />
          <InputField
            autocomplete="username"
            formId={formId}
            id="email_address"
            label="Email address (required)"
            name="username"
            type="email"
            validator="email"
          />
          <InputField
            autocomplete="new-password"
            formId={formId}
            id="pwd"
            label="Password (required)"
            name="password"
            type="password"
            validator="password"
          />
          <PrimaryButton type="submit" id="create_account" value="Create Account" />
          <Link
            id="signInLink"
            value="Sign in"
            onClick={() => push("/login")}
          />
        </Form>
      </div>
    </Layout>
  );
};

export default CreateAccount;
