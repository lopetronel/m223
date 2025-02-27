package ch.zli.m223.punchclock.controller;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import ch.zli.m223.punchclock.domain.User;
import ch.zli.m223.punchclock.service.AuthenticationService;

@Tag(name = "Authorization", description = "Sample to manage Authorization")
@Path("/auth")
public class AuthentificationController {
    @Inject
    AuthenticationService authenticationService; 

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String login(User user){

        if(authenticationService.checkIfUserExists(user)){
            return authenticationService.generateValidJwtToken(user.getUsername());
        }
        else{
            throw new NotAuthorizedException("User ["+user.getUsername()+"] not known");
        }
    }

}
