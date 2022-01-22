package ws;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.*;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import dao.ServerDaoLocal;
import entities.SmartPhone;
import entities.User;


@Stateless
@Path("/api/position")
public class PositionService {
	
	@EJB
	private ServerDaoLocal local;

	@POST
	@Path("/save")
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean adduser(User c) {
		return local.create(c);
	}

	@GET
	@Path("/find/{code}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getCompte(@PathParam(value = "code") Long code) {
		return local.findUserById(code);
	}

	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<SmartPhone> listusers() {
		return local.findAllSmartPhones();
	}

	


}