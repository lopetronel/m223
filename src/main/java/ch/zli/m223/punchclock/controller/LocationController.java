package ch.zli.m223.punchclock.controller;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import ch.zli.m223.punchclock.domain.Location;
import ch.zli.m223.punchclock.service.LocationService;

@Path("/locations")
@Tag(name = "Locations", description = "Handling of Locations")
public class LocationController {
    @Inject
    LocationService locationService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "List all Locations", description = "")
    public List<Location> list() {
        return locationService.findAll();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Add a new Location", description = "The newly created location is returned. The id may not be passed.")
    public Location add(Location location) {
       return locationService.createLocation(location);
    }


}