import axios from 'axios';

export default axios.create( 
    {
        baseURL : 'http://15.206.110.130:5001/' ,
        headers: {
            'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsIm1vYmlsZV9udW1iZXIiOiI5ODc5OTAwMDAxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoid2Vkc3NAc2RzLmNvbSIsImlhdCI6MTYyNTc0ODQ0MiwiZXhwIjoxMDI2NTc0ODQ0MiwiYXVkIjoiMTYiLCJpc3MiOiJMZWFndWUgWCJ9.uu_UgCFwKlmUfdEd2Bcqr9CyvvpI7ncY6Ot2b_xe3mw'
          }
    }
)