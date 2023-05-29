import { Resolver } from 'types';

const resolvers: Resolver = {

  User: {
    role: async (parent, args, context) => {
      const { db } = context;
      const role = await db.role.findUnique({
        where: {
          id: parent.roleId,
        },
      
      });
      return role;
    }
  }, 


  Query: {
    users: async (parent, args, context) => {
      const { db, session } = context;

      const email = session?.user?.email ?? '';

      if (!session) {
        return null;
      }

      const user  = await db.user.findUnique({
        where: {
          email: email,
        },
        include: {
          role: true,
        }
      });

      const users = await db.user.findMany({
        include: {
          role: true,
        }
      });

      const userRole = user?.role?.name ?? '';

      if(userRole === 'ADMIN') {
        return users;
      }

      return null;
      
    },
    user: async (parent, args, context) => {

      const { db } = context;
      const user = await db.user.findFirst({
        where: {
          email: args.email,
        },
      });
      return user;
    },

    material: async (parent, args, context) => {
      const { db } = context;
      const material = await db.material.findUnique({
        where: {
          id: args.id,
        },
        include: {
          movements: true,
          createdBy: true,
        }
      });
      return material;
    },
    

    materials: async (parent, args, context) => {
      const { db } = context;
      
      const materials = await db.material.findMany({
        include: {
          movements: true,
          createdBy: true,
        }
      });
      return materials;
      
    },
    movements: async (parent, args, context) => {
      const { db } = context;
      const movements = await db.movement.findMany({
        include: {
          material: true,
          performedBy: true,
        }
      });
      return movements;
    },

    sessions: async (parent, args, context) => {
      const { db } = context;
      const sessions = await db.session.findMany({
        include: {
          user: true,
        },
      });
      return sessions;
    },

    

  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const { db } = context;
      const { name, email } = args;

      const newUser = await db.user.create({
        data: {
          email,
          name,
        },
      });

      return newUser;
    },
    createMaterial: async (parent, args, context) => {
      const { db,session } = context;
      const { name, price, createdAt } = args;

      return await db.material.create({
        data: {
          name: name,
          price: price,
          createdAt: new Date(createdAt),
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
          }
        }
      },
      });
    },
    createMovement: async (parent, args, context) => {
  const { db, session } = context;
  const { dateMov, quantityIn ,quantityOut , type, material } = args;

  return await db.movement.create({
    data: {
      dateMov: new Date(dateMov),
      quantityIn: quantityIn,
      quantityOut: quantityOut,
      type: type,
      material: {
        connect: {
          id: material,
        }
      },
      performedBy: {
        connect: {
          email: session?.user?.email ?? '',
        },
      },
    }
  });
},
  
  },
};

export { resolvers };
