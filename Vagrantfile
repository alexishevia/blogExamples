Vagrant.configure("2") do |config|
  # box to build from
  config.vm.box = "precise32"

  # the url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  # use bridged networking
  config.vm.network :public_network

  # provision with Puppet stand alone
    config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.module_path = "puppet/modules"
  end
end
