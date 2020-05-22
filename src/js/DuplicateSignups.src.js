TP = {};
TP.module = {};

(function (app, window, document) {
  'use strict';

  app.module.duplicateSignupsCheck = function () {
    var that = this;

    this.elements = {
      mainElement: $('#duplicateSignupsCheck'),
      signMeUpButton: $('#submitSignupInfo'),
      submitButton: $('#duplicateSignupsCheckSubmit'),
      closeButton: $('#duplicateSignupsCheckClose'),
      message: $('#duplicateSignupsCheckMessage'),
      counter: $('#charactersRemaining'),
      hiddenId: $('#signupId'),
    };

    this.render = function () {
      that.disableButtonElement(that.elements.submitButton, true);
    };

    this.attachEventListeners = function () {
      that.elements.message.keyup(function (e) {
        that.updateCounter();
        that.enableDisableSubmitOnEmptyMessage();
      });

      that.elements.closeButton.on('click', function (e) {
        that.closeModal();
      });

      that.elements.submitButton.click(function (e) {
        that.submitDuplicateSignupForm();
      });

      that.elements.signMeUpButton.on('click', function (e) {
        e.preventDefault();
        //if (app.module.validations.isValidForm('signUpForm')) {
        if (true) {
          that.checkDuplicateSignup();
          e.stopImmediatePropagation(); // stops other click events on the same element from triggering
        }
      });
    };

    this.checkDuplicateSignup = function () {
      // For test purposes, asume is duplicate
      that.elements.mainElement.show();

      //showLoaderBar();
      // diable signup form while checking for duplicates
      //TP.module.signUpMeUpForm.formEnabled = false;

      var signupId = that.elements.hiddenId.val();
      var apiurl = '/api/signup/acquired?signupId=' + signupId;
      $.ajax({
        url: apiurl,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
          if (d.Result) {
            //hideLoaderBar();
            // disable signup submission for duplicates
            //TP.module.signUpMeUpForm.formEnabled = false;
            that.showDuplicateSignupForm();
            // app.module.validations.disableButtonElement(
            //   '#submitSignupInfo',
            //   true
            // );
            //docCookies.setItem('duplicate-signup-dpid', $('#dpid').val(), 3600); // expire in 1 hour
          } else {
            // enable signup submission
            // TP.module.signUpMeUpForm.formEnabled = true;
            // TP.module.signUpMeUpForm.submitForm();
            // docCookies.setItem('duplicate-signup-dpid', '', 3600); // expire in 1 hour
          }
        },
        error: function (jqXHR, exception) {
          //hideLoaderBar();
          // enable signup submission
          //TP.module.signUpMeUpForm.formEnabled = true;
          //   app.module.validations.disableButtonElement(
          //     '#submitSignupInfo',
          //     false
          //   );
        },
      });
    };

    this.submitDuplicateSignupForm = function () {
      //showLoaderBar();
      var formData = {
        message: that.elements.message.val(),
      };

      var signupId = that.elements.hiddenId.val();
      var apiurl = '/api/signup/duplicate?signupId=' + signupId;
      $.ajax({
        url: apiurl,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(formData),
        success: function (d) {
          that.submitSuccess(d);
        },
        error: function (jqXHR, exception) {
          //hideLoaderBar();
        },
      });
    };

    this.submitSuccess = function (data) {
      //hideLoaderBar();
      that.closeModal();
    };

    this.updateCounter = function () {
      that.elements.counter.text(
        that.elements.message.val().length + '/2000 characters'
      );
    };

    this.closeModal = function () {
      //$.fancybox.close();
      console.log('close fancy box');
      that.elements.mainElement.hide();
    };

    this.showDuplicateSignupForm = function () {
      // $.fancybox({
      //     href: "#duplicateSignupsCheck"
      // });
      console.log('open fancy box');
      that.elements.mainElement.show();
    };

    this.enableDisableSubmitOnEmptyMessage = function () {
      if (that.elements.message.val().length > 0) {
        that.disableButtonElement(that.elements.submitButton, false);
      } else {
        that.disableButtonElement(that.elements.submitButton, true);
      }
    };

    // adds style to submit button and enables or disables the button
    this.disableButtonElement = function (element, disabled) {
      element.prop('disabled', disabled);
      if (disabled) {
        element.addClass('creditCheckPopup__button_disabled');
      } else {
        element.removeClass('creditCheckPopup__button_disabled');
      }
    };

    this.init = function () {
      if (that.elements.mainElement.length > 0) {
        that.render();
        that.attachEventListeners();
      }
    };
  };
})(TP, window, document);

new TP.module.duplicateSignupsCheck().init();
