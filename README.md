Project Name: Currency Converter
Developed By: AGWARA NNAEMEKA
Email Address: nnaemekaagwara@gmail.com
Phone: +2347064839441

Exterbal Libraries Used: styled-components, react-currency-flags, axios

The react-currency-flags has a pair dependency with styled-components. It is used for displaying the currency flag. 
axios is used for making the http request to the endpoint.



I'm using mock data because the server was throwing up CORS error. But one might nit be able to convert between currency
pairs because of the CORS error.

I noticed a small problem with API endpoint, one can not make enough request for testing purposes, I thought it was a client side error unitl I used Postman I got this message: 

      {
          "status": 400,
          "error": "Free API limit reached."
      }

    ---This really slowed me down in completing the task.

      Or this error message.

      <html>

      <body>
        <h1>503 Service Unavailable</h1>
        No server is available to handle this request.
      </body>

      </html>
      