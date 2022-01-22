package ws;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.*;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import dao.ServerDaoLocal;
import entities.SmartPhone;
import entities.User;


@Stateless
@Path("phone")

public class SmartPhoneService {
	
	@EJB
	private ServerDaoLocal local;

	@POST
	@Path("/save")
	@Consumes("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean addSmartphone(SmartPhone c) {
		return local.create(c);
	}

	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<SmartPhone> listSmartphones() {
		return local.findAllSmartPhones();
	}

	


}